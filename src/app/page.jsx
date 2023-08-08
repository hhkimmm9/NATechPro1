import Image from 'next/image'

export default function Home() {
  return (
    <>
      <div className='py-12 flex flex-col gap-28'>
        {/*  */}
        <div className="flex flex-col gap-12 items-center">
          <div className='text-center'>
            <h1 className="text-5xl font-semibold text-neutral-700">Combine Images</h1>
            <p className='text-xl font-normal text-neutral-600'>All-In-One AI Photo Editing Tool</p>
          </div>

          <div className="max-w-3xl py-12 flex flex-col rounded-2xl bg-neutral-200">
            <div className="p-8 grid grid-cols-3">
              <div className='col-span-2 p-14'>
                <p className="font-semibold text-2xl">
                  Combine <span className="text-amber-600">multiple images</span>
                  to a <span className="text-amber-600">single</span> image with any{" "}
                  <span className="text-amber-600">background</span> of your choice
                </p>
              </div>

              <Image src="/images/pug-face-11.webp"
                alt="" width={680} height={680} className="col-span-1 object-contain"
              />
            </div>

            <button className="w-min mt-6 px-5 py-1.5 flex mx-auto rounded-2xl bg-amber-600">
              <p className='whitespace-nowrap font-semibold text-white'>Try now</p>
            </button>
          </div>
        </div>

        {/*  */}
        <div className="py-12 flex flex-col gap-8 text-center bg-orange-50">
          <h1 className="text-4xl font-bold text-neutral-700">4 Simple Steps</h1>
          <div className="max-w-7xl mx-auto grid grid-cols-4 gap-12">
            {/*  */}
            <div className="col-span-1 flex flex-col gap-4 items-center">
              <Image
                src="/images/image-placeholder.jpeg"
                alt="" width={1200} height={1200}
                className="w-52 rounded-full border-8 border-orange-400"
              />
              <p className="text-lg">
                <span className="font-bold">Remove</span> Image Background
              </p>
            </div>
            {/*  */}
            <div className="col-span-1 flex flex-col gap-4 items-center">
              <Image
                src="/images/image-placeholder.jpeg"
                alt="" width={1200} height={1200}
                className="w-52 rounded-full border-8 border-orange-400"
              />
              <p className="text-lg">
                <span className="font-bold">Save</span> Images with
                <span className="font-bold">Transparent</span> Background
              </p>
            </div>
            {/*  */}
            <div className="col-span-1 flex flex-col gap-4 items-center">
              <Image
                src="/images/image-placeholder.jpeg"
                alt="" width={1200} height={1200}
                className="w-52 rounded-full border-8 border-orange-400"
              />
              <p className="text-lg">
                <span className="font-bold">Add</span> tags to images for easy
                access
              </p>
            </div>
            {/*  */}
            <div className="col-span-1 flex flex-col gap-4 items-center">
              <Image
                src="/images/image-placeholder.jpeg"
                alt="" width={1200} height={1200}
                className="w-52 rounded-full border-8 border-orange-400"
              />
              <p className="text-lg">
                <span className="font-bold">Combine</span> images with a
                <span className="font-bold">new</span> background of your choice!
              </p>
            </div>
          </div>
        </div>

        <div className='px-12 py-8 grid grid-cols-2 gap-16 bg-neutral-100'>
          <div className='col-span-1 flex flex-col gap-8'>
            <Image scr="/images/image-placeholder.jpeg" alt="" width={1200} height={1200}
              className='object-contain'
            />
            <button className='w-min mt-6 px-5 py-1.5 flex mx-auto rounded-2xl bg-amber-600'>
              <p className='whitespace-nowrap font-semibold text-white'>Try now</p>
            </button>
          </div>
          <div className='col-span-1 mx-auto px-8 flex flex-col gap-8 justify-center'>
            <h3 className='text-5xl'>Combine images with easy-to-use features</h3>
            <div className='grid grid-rows-2 grid-cols-2 gap-12'>
              <div className='relative flex flex-col'>
                {/* <Image src=""
                  alt="" width={} height={} className=''
                /> */}
                <h4 className='text-2xl'>Tag it</h4>
                <p>Tag images to search for svaed images faster</p>
              </div>
              <div>
                <h4 className='text-2xl'>Resize</h4>
                <p>Resize any images to fit nicely to a new background</p>
              </div>
              <div>
                <h4 className='text-2xl'>Relocate</h4>
                <p>Drag and drop images to any places</p>
              </div>
              <div>
                <h4 className='text-2xl'>Choose</h4>
                <p>Select or upload a new background of your choice</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
