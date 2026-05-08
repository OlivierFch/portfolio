import messages from "./public/local.json";

type Messages = typeof messages;

declare global {
  interface IntlMessages extends Messages {}
}
