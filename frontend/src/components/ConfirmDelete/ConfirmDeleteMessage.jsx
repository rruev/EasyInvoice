function ConfirmDeleteMessage({ onConfirm, onCancel, isLoading, target, id=undefined }) {
    return (
        <div className="business-profile__modal-backdrop" role="presentation" onClick={onCancel}>
            <div className="business-profile__modal" role="dialog" aria-modal="true" aria-labelledby="delete-account-title" onClick={(e) => e.stopPropagation()}>
                <h3 id="delete-account-title" className="business-profile__modal-title">Delete {target}?</h3>
                <p className="business-profile__modal-text">
                    This action will permanently delete your {target.toLowerCase()} and all related data. This cannot be undone.
                </p>
                <div className="business-profile__modal-actions">
                    <button type="button" className="business-profile__button business-profile__button--cancel" onClick={onCancel}>
                        Cancel
                    </button>
                    <button type="button" className="business-profile__button business-profile__button--delete" onClick={() => { onConfirm(id); onCancel(); }} disabled={isLoading}>
                        {isLoading ? `Deleting ${target}...` : `Delete ${target}`}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDeleteMessage;