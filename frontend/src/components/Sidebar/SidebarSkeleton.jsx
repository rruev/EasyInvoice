import "./SidebarSkeleton.css";

function SidebarSkeleton() {
  return (
    <aside className="sidebar sidebar-skeleton" aria-live="polite" aria-busy="true" role="status" aria-label="Loading navigation">
      <div className="sidebar-skeleton__logo">
        <div className="sidebar-skeleton__line sidebar-skeleton__brand" />
        <div className="sidebar-skeleton__line sidebar-skeleton__icon" />
      </div>

      <nav className="sidebar-skeleton__menu" aria-hidden="true">
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="sidebar-skeleton__line sidebar-skeleton__item" key={index} />
        ))}
      </nav>
    </aside>
  );
}

export default SidebarSkeleton;
