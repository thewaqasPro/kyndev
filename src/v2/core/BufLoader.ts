import * as THREE from 'three';

interface PackedComponent {
  delta: number;
  from: number;
}

interface BufferAttributeDef {
  id: string;
  componentSize: number;
  storageType: string;
  needsPack?: boolean;
  packedComponents?: PackedComponent[];
}

interface BufferHeader {
  vertexCount: number;
  indexCount: number;
  attributes: BufferAttributeDef[];
  meshType?: string;
  sceneData?: any[];
}

/**
 * Binary BufferGeometry Loader for Kyndev .buf models
 */
export class BufLoader {
  public static async load(url: string): Promise<THREE.BufferGeometry> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load .buf file from ${url}: ${response.statusText}`);
    }
    const buffer = await response.arrayBuffer();
    return this.parse(buffer);
  }

  public static parse(buffer: ArrayBuffer): THREE.BufferGeometry {
    const headerSize = new Uint32Array(buffer, 0, 1)[0];
    const headerBytes = new Uint8Array(buffer, 4, headerSize);
    const headerJson: BufferHeader = JSON.parse(new TextDecoder().decode(headerBytes));

    let offset = 4 + headerSize;
    const geometry = new THREE.BufferGeometry();
    const { vertexCount, indexCount, attributes } = headerJson;

    for (let i = 0; i < attributes.length; i++) {
      const attr = attributes[i];
      const count = attr.id === 'indices' ? indexCount : vertexCount;
      const size = attr.componentSize;
      const TypedArrayConstructor = (globalThis as any)[attr.storageType] || Float32Array;
      const rawArray = new TypedArrayConstructor(buffer, offset, count * size);
      const bytesPerElement = TypedArrayConstructor.BYTES_PER_ELEMENT;

      let finalArray: any;

      if (attr.needsPack && attr.packedComponents) {
        const packed = attr.packedComponents;
        const k = packed.length;
        const isSigned = attr.storageType.indexOf('Int') === 0;
        const D = 1 << (bytesPerElement * 8);
        const ne = isSigned ? D * 0.5 : 0;
        const re = 1 / D;
        finalArray = new Float32Array(count * size);

        for (let ce = 0, z = 0; ce < count; ce++) {
          for (let j = 0; j < k; j++) {
            const comp = packed[j];
            finalArray[z] = (rawArray[z] + ne) * re * comp.delta + comp.from;
            z++;
          }
        }
      } else {
        finalArray = rawArray;
      }

      if (attr.id === 'indices') {
        geometry.setIndex(new THREE.BufferAttribute(finalArray, 1));
      } else {
        geometry.setAttribute(attr.id, new THREE.BufferAttribute(finalArray, size));
      }

      offset += count * size * bytesPerElement;
    }

    geometry.computeVertexNormals();
    return geometry;
  }
}
