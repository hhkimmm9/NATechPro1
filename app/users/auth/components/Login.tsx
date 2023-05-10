import React from 'react'

const Login = () => {
  return (
    <div className='flex flex-col space-y-8 mt-6'>
      {/* oauth */}
      <div className='flex flex-col gap-2 text-gray-600 w-min mx-auto'>
        <div className='py-2 pl-4 pr-8 border-2 border-gray-300 rounded-full text-center whitespace-nowrap flex gap-2 items-center'>
          <img src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-facebook-2019-circle-512.png" alt=""
            className='w-5'
          />
          <span>Continue with Facebook</span>
        </div>
        <div className='py-2 pl-4 pr-8 border-2 border-gray-300 rounded-full text-center whitespace-nowrap flex gap-2 items-center'>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png" alt=""
            className='w-5'
          />
          <span>Continue with Google</span>
        </div>
      </div>

      <div className='mx-auto text-gray-500 font-light flex flex-row items-center gap-2'>
        <hr className='w-60'/><p>or</p><hr className='w-60'/>
      </div>

      <div className='text-gray-500 font-light flex flex-col gap-2'>
        <form action="" className='flex flex-col space-y-4'>
          {/* text input */}
          <div className='flex flex-col space-y-3'>
            <div className='flex flex-col'>
              Email
              <input type="text" className='border p-1.5'/>
            </div>
            <div className='flex flex-col'>
              <p className='whitespace-nowrap'> Password </p>
              <input type="text" className='border p-1.5'/>
            </div>
          </div>

          {/* checkboxes */}
          <div className='flex gap-2'>
            <input type="checkbox" />
            <p> Remember me </p>
          </div>

          <button type='submit'
            className='bg-sky-600 w-min py-2 px-6 whitespace-nowrap rounded-full text-white hover:bg-sky-500 mx-auto'
          > Log in </button>
        </form>

        <div className='w-4/5 mx-auto text-center'>
          <p className='text-sm'>This form is protected by hCaptcha and its Privacy Policy and Terms of Service</p>
        </div>
      </div>
    </div>
  )
}

export default Login