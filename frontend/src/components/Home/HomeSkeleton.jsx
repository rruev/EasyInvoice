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

                <div className="home-skeleton__workspace" aria-hidden="true">
                    <section className="home-skeleton__panel home-skeleton__panel--form">
                        <div className="home-skeleton__line home-skeleton__panel-title" />
                        <div className="home-skeleton__line home-skeleton__panel-subtitle" />

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

                    <section className="home-skeleton__panel home-skeleton__panel--preview">
                        <div className="home-skeleton__line home-skeleton__panel-title" />
                        <div className="home-skeleton__line home-skeleton__panel-subtitle home-skeleton__panel-subtitle--short" />
                        <div className="home-skeleton__preview-box">
                            <div className="home-skeleton__preview-bar" />
                            <div className="home-skeleton__preview-bar home-skeleton__preview-bar--short" />
                            <div className="home-skeleton__preview-bar home-skeleton__preview-bar--tall" />
                        </div>
                    </section>
                </div>
            </section>
        </main>
    );
}

export default HomeSkeleton;
