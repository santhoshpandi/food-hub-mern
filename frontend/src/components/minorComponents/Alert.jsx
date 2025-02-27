import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export default function Alerts({ alert, setAlert }) {

  const { trigger, message, severity } = alert

  // Installation
  // npm install @mui/material @emotion/react @emotion/styled

  // Alert Structure
  // const [alert, setAlert] = useState({
  //   trigger: false, message: '', severity: ''
  // })

  // success, info, warning, error

  return (
    <Snackbar
      onClose={() => setAlert({ ...alert, trigger: false })}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={trigger}
      autoHideDuration={2000}
    >
      <Alert onClose={() => setAlert({ ...alert, trigger: false })} severity={severity}>{message}</Alert>
    </Snackbar>
  )
}