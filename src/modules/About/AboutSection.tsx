import { AboutBlock, HeroHeader, Leaf, TeamCard, WherePath } from "@/components";

const teamMembers = [
    { id: 1, name: "Александр Петров", position: "Главный повар", image: "/images/team1.svg" },
    { id: 2, name: "Александр Петров", position: "Начальник смены", image: "/images/team1.svg" },
    { id: 3, name: "Александр Петров", position: "Бренд-шеф", image: "/images/team1.svg" },
    { id: 4, name: "Александр Петров", position: "Aдминистратор", image: "/images/team1.svg" },
    { id: 5, name: "Александр Петров", position: "Aдминистратор", image: "/images/team1.svg" },
    { id: 6, name: "Александр Петров", position: "Aдминистратор", image: "/images/team1.svg" },
];

const AboutPage = () => {
    return (
        <div className="relative z-10 flex flex-col pt-5 pb-24">
            <Leaf style={{ top: "220px", right: "20px", width: "230px", height: "230px", transform: "rotate(185deg)" }} />
            <Leaf style={{ top: "33%", left: "-20px", width: "230px", height: "230px", transform: "rotate(10deg)" }} />
            <Leaf style={{ bottom: "400px", right: "20px", width: "200px", height: "200px", transform: "rotate(-170deg)" }} />
            <Leaf style={{ bottom: "80px", left: "-20px", width: "220px", height: "220px", transform: "rotate(10deg)" }} />
            <div className="containers relative w-full">

                <div className="relative w-full overflow-hidden" style={{ backdropFilter: "blur(14px)", background: "rgba(255, 255, 255, 0.32)", boxShadow: "0 8px 48px rgba(0, 0, 0, 0.18)", borderRadius: "32px" }}>
                    <HeroHeader />

                    <div className="px-12 pt-6 pb-24">
                        <WherePath pageName="О нас" pageHref="/about" title="О нас" />

                        <p className="text-black text-[18px] leading-[150%] mb-8 max-w-6xl mx-auto text-start">
                            С 1995 года наша миссия в ресторане — питать и вдохновлять каждого члена команды, гостя и сообщество, которому мы служим. Спустя все эти годы эти основные ценности остаются в основе всего, что мы делаем. От нашего меню до наших услуг и способов ведения бизнеса — наш свежий, неожиданный и человечный взгляд отличает нас. Мы называем это Необыкновенной Добротой. И это во всем, что мы делаем.
                        </p>
                        <p className="text-black text-[18px] leading-[150%] max-w-6xl mx-auto text-start mb-6">
                            Имея более 450 ресторанов в 26 штатах и более 8000 членов команды, мы два года подряд были названы Forbes одним из лучших работодателей Америки в области разнообразия. Денверский деловой журнал признал нас одним из лучших мест для работы. Мы считаем, что эти успехи основаны на нашей уникальной и заботливой культуре, благодаря которой каждый, кто входит в наши двери, чувствует себя желанным гостем и оцененным по достоинству.
                        </p>

                        <AboutBlock
                            title="Наша еда"
                            image="/images/our-meals.png"
                            showBtn
                            text1="Наша страсть — создавать исключительные впечатления от еды по отличной цене. От традиционных и современных блюд до наших собственных кулинарных творений, таких как фаршированные тортеллони премиум-класса, наши свежеприготовленные рецепты отличаются индивидуальностью, креативностью и ярким вкусом кухонь всего мира."
                            text2="От «Пенне Роза» до японской лапши, салата «Мед» и всемирно известных макарон с сыром «Висконсин» — мы используем только самые лучшие и полезные ингредиенты. Каждое блюдо готовится свежим и делается на заказ. Наше богатое меню наполнено яркими, яркими и приятными вкусами."
                        />

                        <AboutBlock
                            title="Наш путь"
                            image="/images/our-ways.png"
                            reverse
                            text1="С самого начала мы взяли на себя обязательство предлагать свежие продукты, свежие ингредиенты и новый взгляд на заботу о наших гостях, членах нашей команды и наших сообществах. Мы искренне верим, что нет ничего, что могло бы объединить людей или сделать мир лучше, чем тарелка лапши."
                            text2="Продолжая расти, мы реализуем ключевые инициативы во всей нашей компании, чтобы поддержать светлое будущее. В нашем отчете о влиянии рассматриваются некоторые из этих областей, такие как создание меню, наполненного свежими и захватывающими новыми вкусами; активация лучших в отрасли льгот для людей; и некоторые способы лучше заботиться о наших сообществах — и о нашей планете — которую мы называем домом."
                        />

                        <h2 className="text-center font-black text-black mt-16 mb-14" style={{ fontSize: "48px", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 2 }}>
                            Наша команда
                        </h2>

                        <div className="flex flex-wrap gap-30 justify-center items-center">
                            {teamMembers.map((member) => (
                                <TeamCard key={member.id} name={member.name} position={member.position} image={member.image} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;