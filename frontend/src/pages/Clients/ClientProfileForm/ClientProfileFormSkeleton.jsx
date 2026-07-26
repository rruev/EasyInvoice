import "./ClientProfileFormSkeleton.css";

function ClientProfileFormSkeleton() {
    return (
        <section className="client-profile" aria-label="Client profile form" aria-busy="true">
            <div className="client-profile__card client-profile__skeleton" aria-hidden="true">
                <div className="client-profile__header">
                    <div>
                        <div className="client-profile__skeleton-block client-profile__skeleton-block--eyebrow" />
                        <div className="client-profile__skeleton-block client-profile__skeleton-block--title" />
                        <div className="client-profile__skeleton-block client-profile__skeleton-block--subtitle" />
                    </div>
                    <div className="client-profile__skeleton-block client-profile__skeleton-block--status" />
                </div>

                <div className="client-profile__form">
                    <div className="client-profile__field">
                        <div className="client-profile__skeleton-block client-profile__skeleton-block--label" />
                        <div className="client-profile__skeleton-block client-profile__skeleton-block--input" />
                    </div>
                    <div className="client-profile__field">
                        <div className="client-profile__skeleton-block client-profile__skeleton-block--label" />
                        <div className="client-profile__skeleton-block client-profile__skeleton-block--input" />
                    </div>
                    <div className="client-profile__field client-profile__field--wide">
                        <div className="client-profile__skeleton-block client-profile__skeleton-block--label" />
                        <div className="client-profile__skeleton-block client-profile__skeleton-block--input" />
                    </div>
                    <div className="client-profile__field">
                        <div className="client-profile__skeleton-block client-profile__skeleton-block--label" />
                        <div className="client-profile__skeleton-block client-profile__skeleton-block--input" />
                    </div>
                    <div className="client-profile__actions">
                        <div className="client-profile__skeleton-block client-profile__skeleton-block--button" />
                        <div className="client-profile__skeleton-block client-profile__skeleton-block--button" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ClientProfileFormSkeleton;