import { toast } from "react-toastify";

export default function Page404() {
  return (
    <>
      {toast.error("404 Page Not Found")}
      <h4>Page Not Found</h4>
    </>
  )
}
