import { Alert } from "@mui/material"

function MessageBox(props) {
  return (
    <>
    <Alert severity={props.variant|| 'info'}>{props.children}</Alert>     
    </>
  )
}

export default MessageBox
