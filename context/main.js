export default function Main() {
	/**
	 * Navbar links active state on scroll
	 */
	let navbarlinks = document.querySelectorAll('#navbar .scrollto')
	const navbarlinksActive = () => {
		let position = window.scrollY + 200
		navbarlinks.forEach((navbarlink) => {
			if (!navbarlink.hash) return
			let section = document.querySelector(navbarlink.hash)
			if (!section) return
			if (
				position >= section.offsetTop &&
				position <= section.offsetTop + section.offsetHeight
			) {
				navbarlink.classList.add('active')
			} else {
				navbarlink.classList.remove('active')
			}
		})
	}
	window.addEventListener('load', navbarlinksActive)
	document.addEventListener('scroll', navbarlinksActive)

	/**
	 * Scrolls to an element with header offset
	 */
	const scrollto = (el) => {
		let header = document.querySelector('#header')
		let offset = header.offsetHeight

		if (!header.classList.contains('header-scrolled')) {
			offset -= 10
		}

		let elementPos = document.querySelector(el).offsetTop
		window.scrollTo({
			top: elementPos - offset,
			behavior: 'smooth',
		})
	}

	/**
	 * Toggle .header-scrolled class to #header when page is scrolled
	 */
	let selectHeader = document.querySelector('#header')
	if (selectHeader) {
		const headerScrolled = () => {
			if (window.scrollY > 100) {
				selectHeader.classList.add('header-scrolled')
			} else {
				selectHeader.classList.remove('header-scrolled')
			}
		}
		window.addEventListener('load', headerScrolled)
		document.addEventListener('scroll', headerScrolled)
	}

	/**
	 * Mobile nav toggle
	 */
	const mobilenav = document.querySelector('.mobile-nav-toggle')
	mobilenav.addEventListener('click', function (e) {
		document.querySelector('#navbar').classList.toggle('navbar-mobile')
		this.classList.toggle('bi-list')
		this.classList.toggle('bi-x')
	})

	/**
	 * Mobile nav dropdowns activate
	 */
	document.querySelectorAll('.navbar .dropdown > a').forEach((e) =>
		e.addEventListener('click', function (e) {
			if (document.querySelector('#navbar').classList.contains('navbar-mobile')) {
				e.preventDefault()
				this.nextElementSibling.classList.toggle('dropdown-active')
			}
		})
	)
}
