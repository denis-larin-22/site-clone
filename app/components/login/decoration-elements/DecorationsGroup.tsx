import DecorationElementLevel from "./DecorationElementLevel";
import DecorationElementUsers from "./DecorationElementUsers";
import DecorationElementUsersGroup from "./DecorationElementUsersGroup";
import DecorationElementWeek from "./DecorationElementWeek";

interface IProps {
    className?: string
}

export default function DecorationsGroup({ className = "" }: IProps) {
    return (
        <div className={"" + className}>
            <DecorationElementUsers />
            <DecorationElementLevel className="absolute z-10 -bottom-[55%] -right-[110%]" /> {/* Level and DecorationElementCalendar group*/}
            <DecorationElementWeek className="absolute -bottom-[87%] -right-[40%]" />
            <DecorationElementUsersGroup className="absolute -bottom-[82%] -right-[120%]" />
        </div>
    )
}