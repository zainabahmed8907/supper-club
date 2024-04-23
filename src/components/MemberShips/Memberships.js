import MemberShipTable from "../MemberShipTable/MemberShipTable";

function MemberShips() {
  return (
    <div className="lg:pt-7 pt-10 pb-10 px-10 lg:mt-16 bg-white">
      <div className="flex flex-col items-center pb-10">
        <p className="text-2xl xl:text-4xl
        font-bold text-center">
          SupperClub vs Other LifeStyle MemberShips
        </p>
        <div className="border-primary border-b-4 w-20 h-1 pb-2 pt-4"></div>
        <div className="mt-10">
          <MemberShipTable />
        </div>
      </div>

    </div>
  );
}

export default MemberShips;
