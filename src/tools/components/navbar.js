export default class Navbar {
	constructor() {
		const nav = document.querySelector('nav')
		const animation = () => {
			if (window.scrollY > 50) {
				nav?.classList.add('shadow-md', 'animate__slideInDown')
				nav?.classList.remove('md:bg-transparent')
			} else {
				nav?.classList.remove('shadow-md', 'animate__slideInDown')
				nav?.classList.add('md:bg-transparent')
			}
		}
		if (typeof window !== 'undefined' && typeof document !== 'undefined') {
			window.addEventListener('load', animation)
			document.addEventListener('scroll', animation)
		}
	}
}
