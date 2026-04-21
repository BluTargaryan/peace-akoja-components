import Button from "../components/atoms/Button";
import { MdOutlineArrowBack } from "react-icons/md";

export default function ComponentDetailPage() {
  return (
    <main>
        <div className="ourMaxWidth mb-24">
      <Button content={<><MdOutlineArrowBack className="text-text group-hover:text-accent transition-all duration-300" /> <span>Back</span></>} 
      className="pb-1 border-2 border-t-0 border-l-0 border-r-0 gap-4
      hover:text-accent hover:border-accent hover:bg-transparent  group
      " />
</div>

<h1 className="mb-20 ourMaxWidth">
Component Name
</h1>
    </main>
  );
}
