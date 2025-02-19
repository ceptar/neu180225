export interface PageTitleProps {
    title: string | null;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
    return (
        <div className="pb-4 w-full h-full flex flex-row justify-center items-center">
            <div className="w-full h-full min-h-full flex flex-col justify-center items-stretch">
                <div className="w-full h-full flex flex-row"></div>
                <div className="w-full h-[2px] flex flex-row bg-primary"></div>
                <div className="w-full h-full flex flex-row"></div>
            </div>
            <div className="py-12 w-full h-full flex flex-col justify-center items-center">
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <h1 className="text-center font-titlefont text-3xl font-bold uppercase text-primary px-6">
                        {title}
                    </h1>
                </div>
            </div>
            <div className="w-full h-full min-h-full flex flex-col justify-center items-stretch">
                <div className="w-full h-full flex flex-row"></div>
                <div className="w-full h-[2px] flex flex-row bg-primary"></div>
                <div className="w-full h-full flex flex-row"></div>
            </div>
        </div>
    );
};
