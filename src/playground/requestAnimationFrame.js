//logging utitlity -- check the browser console for a nice log of the redux store
function logState() {
  let state = storeApp.getState().logo
  console.group('new Redux store state');
	Object.keys(state).forEach(i => {console.log(`${i}: `, state[i])})
  console.groupEnd();
}

// Redux Devtools setup
const DevTools = window.DevTools['default']
const finalCreateStore = Redux.compose(
  DevTools.instrument()
)(Redux.createStore)

// RGB color consts
const TEXT_COLOR_RED_START   = 67
const TEXT_COLOR_RED_END     = 255
const TEXT_COLOR_RED_DIFF    = TEXT_COLOR_RED_END - TEXT_COLOR_RED_START

const TEXT_COLOR_GREEN_START = 176
const TEXT_COLOR_GREEN_END   = 255
const TEXT_COLOR_GREEN_DIFF  = TEXT_COLOR_GREEN_END - TEXT_COLOR_GREEN_START

const TEXT_COLOR_BLUE_START  = 42
const TEXT_COLOR_BLUE_END    = 255
const TEXT_COLOR_BLUE_DIFF   = TEXT_COLOR_BLUE_END -TEXT_COLOR_BLUE_START

const BACKGROUND_POS_START = 50

const getBackgroundColor = function(animationProgress) {
  // 255, 255, 255 is rgb 'white'. This calculates how close to white
  // each color channel is based on the animationProgress
  let red   = TEXT_COLOR_RED_START   + Math.ceil(animationProgress * TEXT_COLOR_RED_DIFF)
  let green = TEXT_COLOR_GREEN_START + Math.ceil(animationProgress * TEXT_COLOR_GREEN_DIFF)
  let blue  = TEXT_COLOR_BLUE_START  + Math.ceil(animationProgress * TEXT_COLOR_BLUE_DIFF)

  return `rgb(${red}, ${green}, ${blue})`
}

// Redux reducer setup
const defaultLogoState = {
	animationProgress : 0,
  lightLogoOpacity  : 1,
  colorLogoOpacity  : 0,
  backgroundPos     : 0,
  backgroundColor   : 'rgb(67, 176, 42)'
}

const logoReducer = function(state = defaultLogoState, action) {
  switch (action.type){
    case 'LOGO.SET_NEXT_ANIMATION_STEP':
    	let progress = action.progress
      
      return Object.assign({}, state, {
      	animationProgress : progress,
        lightLogoOpacity  : 1 - progress,
        colorLogoOpacity  : progress,
        backgroundPos     : Math.floor(BACKGROUND_POS_START - (progress * BACKGROUND_POS_START)),
        backgroundColor   : getBackgroundColor(progress)
      })
    default:
      return state
  }
}

// Redux action
const logoAnimationStep = function(progress) {
	return {
  	type: 'LOGO.SET_NEXT_ANIMATION_STEP',
    progress: progress
  }
}

// Redux store setup
const storeApp = finalCreateStore(Redux.combineReducers({logo: logoReducer}))

// React Components
const Logo = React.createClass({  
	render: function() {
 		let wrapperStyles = {
			transform: `translateY(${this.props.logo.backgroundPos}px)`
    }
    
 		let colorLogoStyles = {
			opacity: this.props.logo.colorLogoOpacity
    }

    let lightLogoStyles = {
			opacity: this.props.logo.lightLogoOpacity
    }
    
	  return (
      <div 
      	className='logo-wrapper absolute-center'
        style={wrapperStyles}
      >
        <a
          className='logo-white absolute-center'
          style={lightLogoStyles}
          href={'http://www.instacart.com'}
          target={'_blank'}
        >
        </a>
        <a
          className='logo-color absolute-center'
          style={colorLogoStyles}
          href={'http://www.instacart.com'}
          target={'_blank'}
        >
        </a>
      </div>
    )
  }
})

// Main container component
const Container = React.createClass({
  getInitialState: function() {
    logState()
    return storeApp.getState()
  },
  
  componentDidMount: function() {
    // subscribe to the Redux store's state changes
    this.unSubscribeStore  = storeApp.subscribe(this.onChange)
    
    // start animation
    this.animateLogo()
  },
  
  componentWillUnmount: function() {
    this.unSubscribeStore()
  },
  
  onChange: function() {
  	// set the state for container component every time
    // the Redux store's state changes
    this.setState(storeApp.getState())
    logState()
  },
  
  animateLogo: function() {
		let duration    = 1000 //in ms
    let fps         = 60 //frames per second
    let scrollStep  = 1 / ((duration / 1000) * fps)
    let takeStep    = scrollStep
    let idx         = 1

    let animationStep = function() {
      setTimeout(() => {
        if (this.state.logo.animationProgress < 1) {
          storeApp.dispatch(logoAnimationStep(takeStep))
          idx += 1
          takeStep = scrollStep * idx
          window.requestAnimationFrame(animationStep.bind(this))
        }
      }, 1000 / fps);
    }
		
    // kick off animation
		window.requestAnimationFrame(animationStep.bind(this))
  },
  
	render: function() {
  	let mainContentStyles = {
    	backgroundColor: this.state.logo.backgroundColor
    }
    
  	return (
    	<div className='container-inner'>
        <div 
        	className='main-content'
          style={mainContentStyles}
         >
          <Logo {...this.state} />
        </div>
        <DevTools store={storeApp} />
      </div>
    )
  }
})

// Render final output
ReactDOM.render(
  React.createElement(Container),
  document.getElementById('container')
)
