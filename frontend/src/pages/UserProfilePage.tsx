import NavBar from "../components/NavBar";
import Gallery from "../components/Gallery";
import UserPanel from "../components/User/UserPanel";

export default function UserProfile() {
  return (
    <div>
      <NavBar />
      <div className="font-display flex flex-col justify-center items-align m-auto max-w-7xl p-8 gap-10 mt-30">
        <div className="flex flex-col flex-1 gap-5">
          <UserPanel />

          <div className="container-border bg-indigo-300 rounded-2xl p-3 flex gap-4 justify-center">
            <button className="button flex-1">Canvas to Gallery</button>

            <label className="button cursor-pointer flex-1 text-center">
              Upload to Gallery
              <input type="file" accept="image/*" className="hidden" />
            </label>
          </div>

          <Gallery />
        </div>
      </div>
    </div>
  );
}
