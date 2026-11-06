const moments = [
  { year: "Vision", title: "Set the direction before adding complexity", copy: "Define what the venture is, who it serves, why it should exist, where it can win, and what must remain true as other people take responsibility for building and operating it." },
  { year: "Architecture", title: "Create a foundation other leaders can execute", copy: "Shape the commercial model, behavioral logic, brand position, product requirements, operating structure, and decision boundaries clearly enough for a cross-functional team to move with purpose." },
  { year: "Allocation", title: "Direct resources toward the highest-leverage constraint", copy: "Evaluate where capital, founder attention, technical capacity, distribution, or specialist knowledge can most materially change the trajectory of each studio asset." },
  { year: "Leadership", title: "Put capable people into consequential roles", copy: "Align operators, technical leaders, functional specialists, advisers, and capital partners who can own their disciplines with portfolio oversight at the portfolio and strategic level." },
];

export function FounderTimeline() {
  return (
    <div className="founder-model-sequence" aria-label="Studio lead model phases">
      {moments.map((moment, index) => (
        <article className="founder-model-card" data-founder-model-card key={moment.year}>
          <div className="founder-model-card-meta"><span>{String(index + 1).padStart(2, "0")}</span>{moment.year}</div>
          <h3>{moment.title}</h3>
          <p>{moment.copy}</p>
        </article>
      ))}
    </div>
  );
}
