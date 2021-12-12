import * as yup from 'yup'

const userSchema = yup.object({
  name: yup.string().min(5).max(100).required(),
  username: yup.string().min(5).max(50).required(),
  email: yup.string().email().required(),
  password: yup.number().min(8).required()
})

export default userSchema