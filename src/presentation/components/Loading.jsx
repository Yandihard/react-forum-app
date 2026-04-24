import LoadingBar from '@dimasmds/react-redux-loading-bar'

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <LoadingBar className="bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-500 h-1" />
    </div>
  )
}

export default Loading
