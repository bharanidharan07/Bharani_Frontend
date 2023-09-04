
export const header = () => {
  const token=localStorage.getItem("token")
    return{
        Authorization: `Bearer ${token}`
    }
}