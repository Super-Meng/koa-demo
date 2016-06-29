import 'layout-css'

+function() {
	const set_rem = () => {
		const designW = 750
		const size = 100
		const _ww = window.innerWidth
		const _size = _ww*size/designW
		const doc = document.getElementsByTagName('html')[0]

		doc.style.fontSize = _size + 'px'
	}
	// rem
	set_rem()
	window.onresize = () => set_rem()
}()