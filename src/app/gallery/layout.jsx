import UserSidebar from "@/app/components/UserSidebar"

export default function GalleryLayout({ children }) {
  return (
    <div className='h-screen flex flex-col'>
      <div className="grow flex flex-row">
        <UserSidebar />
        
        <div className="flex flex-col w-full bg-white">
          { children }
        </div>
      </div>
    </div>
  );
}
