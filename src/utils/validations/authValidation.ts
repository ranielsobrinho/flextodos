import * as yup from 'yup'

const authSchema = yup.object({
  username: yup.string().min(5).required(),
  password: yup.string().min(8).required()
})

export default authSchema