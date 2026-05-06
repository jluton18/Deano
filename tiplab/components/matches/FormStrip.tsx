const RESULTS: Array<'W' | 'L' | 'D'> = ['W', 'W', 'L', 'W', 'L'];

export function FormStrip({ results = RESULTS }: { results?: Array<'W' | 'L' | 'D'> }) {
  return (
    <div className="flex gap-[3px] mt-1">
      {results.map((r, i) => (
        <div
          key={i}
          className={`w-4 h-4 rounded-full flex items-center justify-center text-[0.5rem] font-bold form-${r.toLowerCase()}`}
        >
          {r}
        </div>
      ))}
    </div>
  );
}
