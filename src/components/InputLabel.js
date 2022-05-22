import { styled } from "@mui/system";
//Style

const Label = styled("label")({
  marginBottom: "10px",
  display: "inline-block",
  fontWeight: 500,
});

export default function InputLabel({ children, ...other }) {
  return <Label {...other}>{children}</Label>;
}
