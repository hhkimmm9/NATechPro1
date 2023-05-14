export default function Home() {
  return (
    <div>
      <div className="text-center p-12">
        <div>
          <h1 className="text-4xl font-semibold">Combine Images</h1>
          <p>All-In-One AI Photo Editing Tool</p>
        </div>
        <div className="max-w-3xl bg-stone-200 w-2/3 mx-auto mt-6 p-6">
          <div className="flex">
            <p className="w-1/2 p-14">
              Combine <span className="text-amber-600">multiple images</span>
              to a <span className="text-amber-600">single</span> image
              with any <span className="text-amber-600">background</span> of your choice
            </p>
            <div className="w-1/2 flex justify-center">
              <img src="https://easydrawingguides.com/wp-content/uploads/2022/07/pug-face-11.png" alt="" />
            </div>
          </div>
          <button className="rounded-2xl text-white py-1.5 px-5 bg-amber-600 mt-6 text-sm">Try now</button>
        </div>
      </div>
      
      <div className="bg-orange-100 text-center py-6 flex flex-col gap-8">
        <h1 className="text-4xl font-semibold">4 Simple Steps</h1>
        <div className="flex justify-around">
          <div className="flex flex-col">
            <img src="https://images.unsplash.com/photo-1543320317-15188058b450?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHVnJTIwZmFjZXxlbnwwfHwwfHw%3D&w=1000&q=80"
              alt=""
              className="w-52 h-52 rounded-full border-8 border-orange-400"
            />
            <p className="w-48 mt-3"><span className="font-bold">Remove</span> Image Background</p>
          </div>
          <div className="flex flex-col">
            <img src="https://images.unsplash.com/photo-1543320317-15188058b450?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHVnJTIwZmFjZXxlbnwwfHwwfHw%3D&w=1000&q=80"
              alt=""
              className="w-52 h-52 rounded-full border-8 border-orange-400"
            />
            <p className="w-48 mt-3">
              <span className="font-bold">Save</span> Images with
              <span className="font-bold">Transparent</span> Background
            </p>
          </div>
          <div className="flex flex-col">
            <img src="https://images.unsplash.com/photo-1543320317-15188058b450?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHVnJTIwZmFjZXxlbnwwfHwwfHw%3D&w=1000&q=80"
              alt=""
              className="w-52 h-52 rounded-full border-8 border-orange-400"
            />
            <p className="w-48 mt-3"><span className="font-bold">Add</span> tags to images for easy access</p>
          </div>
          <div className="flex flex-col">
            <img src="https://images.unsplash.com/photo-1543320317-15188058b450?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHVnJTIwZmFjZXxlbnwwfHwwfHw%3D&w=1000&q=80"
              alt=""
              className="w-52 h-52 rounded-full border-8 border-orange-400"
            />
            <p className="w-48 mt-3">
              <span className="font-bold">Combine</span> images with a
              <span className="font-bold">new</span> background of your choice!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}