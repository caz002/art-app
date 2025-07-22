import BlankImage from "../../images/NoImageAvaliable.png";

const UserInfo = () => {
    return (
        <div className="container-border bg-indigo-300 p-3 flex-1 flex flex-row max-w-lg gap-2">
            <div className="flex-1 flex flex-col gap-2 bg-indigo-200 p-2 rounded-2xl">
                <div className="flex-1 p-2">
                    <img
                        src={BlankImage}
                        className="min-w-xsm rounded-md"
                    ></img>
                </div>

                <div className="flex-1 flex flex-col gap-1 p-2">
                    <button className="button py-1">Follow</button>
                    <button className="button py-1">Edit</button>
                </div>
            </div>
            {/* Information Section */}
            <div className="flex-1/3 flex flex-col justify-between bg-indigo-200 p-2 rounded-2xl gap-3">
                <div className=" bg-indigo-100 rounded-2xl p-1 text-center font-bold">
                    Cheeseburger Jr.
                </div>
                <div className=" bg-indigo-100 rounded-2xl p-4">
                    <p>
                        Hi! my name is cheeseburger Jr., this is going to be the
                        best day ever! I want to be eaten!
                    </p>
                </div>
                <div className="bg-indigo-100 rounded-2xl p-2 flex flex-row items-center justify-between text-sm">
                    <div>30 Posts</div>
                    <div>20K Views</div>
                    <div>100K Fans</div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
