export const IconCheck = (p)=>(
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export const IconBook = (p)=>(
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M4 19a2 2 0 0 0 2 2h12" stroke="currentColor" strokeWidth="2"/>
    <path d="M20 22V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v16" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 6h8" stroke="currentColor" strokeWidth="2"/>
  </svg>
)

export const Bracket = ({dir="right", ...p})=>(
  <svg width="44" height="18" viewBox="0 0 44 18" fill="none" {...p} style={{display:'block'}}>
    {dir==="right"
      ? <path d="M1 1h30a6 6 0 0 1 6 6v0a6 6 0 0 0 6 6h0" stroke="currentColor" strokeWidth="2" />
      : <path d="M43 1H13a6 6 0 0 0-6 6v0a6 6 0 0 1-6 6h0" stroke="currentColor" strokeWidth="2" />
    }
  </svg>
)
