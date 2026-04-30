import Button from "../components/atoms/Button";
import { MdOutlineArrowBack } from "react-icons/md";
import CodeToggle from "../components/atoms/CodeToggle";
import Link from "next/link";

export default function ComponentDetailPage() {
  return (
    <main>
        <div className="ourMaxWidth mb-20">
          <Link href="/" as="/">
      <Button content={<><MdOutlineArrowBack className="text-text group-hover:text-accent transition-all duration-300" /> <span>Back</span></>} 
      className="pb-1 border-2 border-t-0 border-l-0 border-r-0 gap-4
      hover:text-accent hover:border-accent hover:bg-transparent  group
      " />
      </Link>
</div>

<h1 className="mb-10 ourMaxWidth xl:mb-20">
Component Name
</h1>

<div className="ourMaxWidth flex flex-col gap-5 xl:gap-10">

<div className="w-full py-20 flex items-center justify-center border-2 border-text xl:h-100">
<div className='w-50 h-16 border-2 border-text'/>
</div>

<CodeToggle />

<p>
Dorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.

</p>

</div>
    </main>
  );
}
