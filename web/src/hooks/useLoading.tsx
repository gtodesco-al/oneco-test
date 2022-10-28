import {
  createContext,
  CSSProperties,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

type LoadingContext = (
  ...effects: Promise<any>[]
) => Promise<any> | Promise<any>[]

export const LoadingContext = createContext<LoadingContext>(
  (): Promise<any> => Promise.resolve({})
)

//Tailwind can't handle borders with different colors for each side so it's manually styled.
const spinnerStyles: CSSProperties = {
  borderTop: '0.75rem solid rgba(255,255,255,1)',
  borderLeft: '0.75rem solid rgba(255,255,255,0.5)',
  borderBottom: '0.75rem solid rgba(255,255,255,0.5)',
  borderRight: '0.75rem solid rgba(255,255,255,0.5)',
}

type LoadingProviderProps = {
  children: ReactNode
}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [showLoading, setShowLoading] = useState<boolean>(false)
  const [effects, setEffects] = useState<Promise<any>[]>([])

  useEffect(() => {
    setShowLoading(effects.length > 0)
  }, [effects])

  function showLoadingWhile(...promises: Promise<any>[]) {
    setEffects([...effects, ...promises])
    return Promise.allSettled(promises).then((results) => {
      setEffects(effects.filter((e) => !promises.includes(e)))
      return results.length === 1 ? results[0] : results
    })
  }

  return (
    <LoadingContext.Provider value={showLoadingWhile}>
      {showLoading && (
        <div className="absolute left-0 top-0 w-screen h-screen z-[99] flex justify-center items-center">
          <div className="absolute left-0 top-0 w-screen h-screen bg-black opacity-50 z-10" />
          <div
            className="absolute z-20 rounded-full w-24 h-24 animate-spin"
            style={spinnerStyles}
          />
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  )
}

export const useLoading = () => useContext(LoadingContext)
