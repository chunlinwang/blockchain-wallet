import {Links} from "@/app/components/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
    return <>
        <div className="container">
          <Links/>
          <div className="grid grid-cols-4 gap-2">
            {children}
          </div>
        </div>
    </>
}