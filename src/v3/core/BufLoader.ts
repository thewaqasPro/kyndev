import * as THREE from 'three';

interface PackedComponent {
  delta: number;
  from: number;
}

interface BufAttribute {
  id: string;
  componentSize: number;
  storageType: string;
  needsPack?: boolean;
  packedComponents?: PackedComponent[];
}

interface BufHeader {
  vertexCount: number;
  indexCount: number;
  attributes: BufAttribute[];
}

const TYPED_ARRAY_MAP: Record<string, any> = {
  Uint8Array,
  Int8Array,
  Uint16Array,
  Int16Array,
  Uint32Array,
  Int32Array,
  Float32Array
};

/**
 * BufLoader
 *
 * Exact 1-to-1 reverse-engineered binary .buf parser from deobfuscated.js (BufItem, lines 24465–24922).
 */
export class BufLoader {
  private static _cache: Map<string, THREE.BufferGeometry> = new Map();

  public static async load(url: string): Promise<THREE.BufferGeometry> {
    if (this._cache.has(url)) {
      return this._cache.get(url)!.clone();
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`[BufLoader] Failed to fetch binary buffer at ${url}: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const geometry = this.parse(arrayBuffer);
    this._cache.set(url, geometry);
    return geometry.clone();
  }

  public static parse(buffer: ArrayBuffer): THREE.BufferGeometry {
    const headerLength = new Uint32Array(buffer, 0, 1)[0];
    const headerBytes = new Uint8Array(buffer, 4, headerLength);

    let jsonString = '';
    const CHUNK_SIZE = 8192;
    for (let i = 0; i < headerBytes.length; i += CHUNK_SIZE) {
      const slice = headerBytes.subarray(i, Math.min(i + CHUNK_SIZE, headerBytes.length));
      jsonString += String.fromCharCode.apply(null, slice as unknown as number[]);
    }

    const header: BufHeader = JSON.parse(jsonString);
    const { vertexCount, indexCount, attributes } = header;

    let byteOffset = 4 + headerLength;
    const geometry = new THREE.BufferGeometry();
    let hasNormals = false;

    for (let i = 0; i < attributes.length; i++) {
      const attr = attributes[i];
      const count = attr.id === 'indices' ? indexCount : vertexCount;
      const componentSize = attr.componentSize;
      const TypedArrayConstructor = TYPED_ARRAY_MAP[attr.storageType] || Float32Array;
      const bytesPerElement = TypedArrayConstructor.BYTES_PER_ELEMENT;

      // Handle 4-byte alignment
      const remainder = byteOffset % bytesPerElement;
      if (remainder !== 0) {
        byteOffset += bytesPerElement - remainder;
      }

      const rawTypedArray = new TypedArrayConstructor(buffer, byteOffset, count * componentSize);
      byteOffset += count * componentSize * bytesPerElement;

      let finalArray: ArrayLike<number> = rawTypedArray;

      if (attr.needsPack && attr.packedComponents) {
        const packed = attr.packedComponents;
        const packedLen = packed.length;
        const isInt = attr.storageType.indexOf('Int') === 0;
        const divisor = 1 << (bytesPerElement * 8);
        const shift = isInt ? divisor * 0.5 : 0;
        const invDivisor = 1 / divisor;

        const unpacked = new Float32Array(count * componentSize);
        let ptr = 0;

        for (let v = 0; v < count; v++) {
          for (let c = 0; c < packedLen; c++) {
            const comp = packed[c];
            unpacked[ptr] = (rawTypedArray[ptr] + shift) * invDivisor * comp.delta + comp.from;
            ptr++;
          }
        }
        finalArray = unpacked;
      }

      if (attr.id === 'indices') {
        geometry.setIndex(new THREE.BufferAttribute(finalArray as any, 1));
      } else {
        geometry.setAttribute(attr.id, new THREE.BufferAttribute(finalArray as any, componentSize));
        if (attr.id === 'normal') {
          hasNormals = true;
        }
      }
    }

    if (!hasNormals && geometry.attributes.position) {
      geometry.computeVertexNormals();
    }

    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();

    return geometry;
  }
}
