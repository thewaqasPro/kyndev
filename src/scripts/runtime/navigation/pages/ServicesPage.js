/**
 * Services Page Controller
 */
class ServicesPage extends Page {
  path = "services";
  id = "services";
  endVisualColor = properties.blueColorHex;
}
const servicesPage = new ServicesPage();

export { ServicesPage, servicesPage };
globalThis.servicesPage = servicesPage;

export default servicesPage;
