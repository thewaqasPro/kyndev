/**
 * Contact Page Controller
 */
class ContactPage extends Page {
  path = "contact";
  id = "contact";
  endVisualColor = properties.blueColorHex;
}
const contactPage = new ContactPage();

export { ContactPage, contactPage };
globalThis.contactPage = contactPage;

export default contactPage;
