import { LocaleProvider } from 'antd'
import { withRouter } from 'dva/router'
import App from './app'

export default withRouter((props) => {
  return (
    <LocaleProvider>
      <App>
        { props.children }
      </App>
    </LocaleProvider>
  )
})
