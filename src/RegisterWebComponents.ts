import "./components/Input/BaseInput";
import "./components/Input/Input";
import "./components/card";

import { CardFront,CardBack } from "./components/card";
customElements.define("app-card-front",CardFront);
customElements.define("app-card-back",CardBack);

import NameInput from "./components/NameInput";
customElements.define('app-name-input',NameInput);

import CvcInput from './components/CVCInput';
customElements.define('app-cvc-input',CvcInput);

import CardNumberInput from "./components/CardNumberInput";
customElements.define("app-card-number-input",CardNumberInput);

import DateInput from "./components/DateInput";
customElements.define("app-date-input",DateInput);