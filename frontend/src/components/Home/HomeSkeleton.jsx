import "./HomeSkeleton.css";

function HomeSkeleton() {
    return (
        <main className="main" aria-live="polite" aria-busy="true">
            <section className="home-skeleton" role="status" aria-label="Loading home page">
                <div className="home-skeleton__top">
                    <div className="home-skeleton__line home-skeleton__title" />
                    <div className="home-skeleton__line home-skeleton__profile" />
                </div>

                <div className="home-skeleton__cards">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <article className="home-skeleton__card" key={index}>
                            <div className="home-skeleton__line home-skeleton__card-label" />
                            <div className="home-skeleton__line home-skeleton__card-value" />
                        </article>
                    ))}
                </div>

                <section className="home-skeleton__form" aria-hidden="true">
                    <div className="home-skeleton__line home-skeleton__form-title" />

                    <div className="home-skeleton__fields">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div className="home-skeleton__field" key={index}>
                                <div className="home-skeleton__line home-skeleton__field-label" />
                                <div className="home-skeleton__line home-skeleton__field-input" />
                            </div>
                        ))}
                    </div>

                    <div className="home-skeleton__line home-skeleton__button" />
                </section>
            </section>
        </main>
    );
}

export default HomeSkeleton;
