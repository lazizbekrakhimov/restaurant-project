const Loading = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center blur-md scale-110"/>

            <div className="relative z-10 flex flex-col items-center gap-6">
                <div className="text-5xl font-black text-black tracking-tight">
                    LOGO
                </div>
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-black/10" />
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-black animate-spin" />
                </div>

                <p className="text-sm text-black/50 font-medium tracking-widest uppercase">
                    Загрузка...
                </p>
            </div>
        </div>
    );
}

export default Loading