import Backdrop from "./Backdrop";
import Card from "./Card";
import CssBaseline from "./CssBaseline";
import Input from "./Input";
import Link from "./Link";
import Paper from "./Paper";
import Tooltip from "./Tooltip";
import Typography from "./Typography";

function customizeComponents(theme) {
  return {
    ...Link(theme),
    ...Card(theme),
    ...Input(theme),
    ...Paper(theme),
    ...Tooltip(theme),
    ...Backdrop(theme),
    ...Typography(theme),
    ...CssBaseline(theme),
  };
}

export default customizeComponents;
