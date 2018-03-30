import React from 'react'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

const DevTools = createDevTools(
  // Monitors their repositories to learn about those props.
  // Here, we put LogMonitor inside a DockMonitor.
  // Note: DockMonitor is Visible by default

	<DockMonitor
		defaultSize={1}
		fluid
		toggleVisibilityKey='ctrl-h'
		changePositionKey='ctrl-q'
		defaultIsVisible
	>
		<LogMonitor theme='solarized' />
	</DockMonitor>
)

export default DevTools
