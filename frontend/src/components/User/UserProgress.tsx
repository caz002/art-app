import CalendarHeatmap from "react-calendar-heatmap";
import { useDataContext } from "../../contexts/DataContextProvider";

const UserProgress = () => {
    const { imageData } = useDataContext();

    const dateCounts = new Map<string, number>();

    for (const image of imageData) {
        const date = new Date(image.createdAt).toLocaleDateString();
        dateCounts.set(date, (dateCounts.get(date) || 0) + 1);
    }

    const dates = Array.from(dateCounts, ([date, count]) => ({ date, count }));
    return (
        <div className="container-border bg-indigo-300 p-3 flex flex-col flex-2 justify-center gap-2">
            <div className="bg-indigo-200 rounded-2xl p-2">
                <h1 className="text-center font-bold bg-indigo-100 rounded-2xl p-1 pr-4 pl-4">
                    Progress
                </h1>
                <div className="hidden md:block">
                    <div className="p-2">
                        <CalendarHeatmap
                            startDate={new Date("2025-01-01")}
                            endDate={new Date("2025-12-31")}
                            values={dates}
                            classForValue={(value) => {
                                if (!value) return "color-empty";
                                const val = value.count;

                                if (val > 4) {
                                    return `color-github-${4}`;
                                }

                                return `color-github-${value.count}`;
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-indigo-200 p-2 rounded-2xl">
                <p> Nice! You're current streak is BLANK, keep it up dude!</p>
            </div>
        </div>
    );
};

export default UserProgress;
