import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// Components
import TopBar from 'components/mega-menu/components/TopBar'
import Logo from 'components/mega-menu/components/Logo'
import TopBarTitle from 'components/mega-menu/components/TopBarTitle'
import Hamburger from 'components/mega-menu/components/Hamburger'
import Nav from 'components/mega-menu/components/Nav'
import MainList from 'components/mega-menu/components/MainList'
import MegaList from 'components/mega-menu/components/MegaList'
import MainNavItem from 'components/mega-menu/components/MainNavItem'
import MainNavItemLink from 'components/mega-menu/components/MainNavItemLink'
import NavItem from 'components/mega-menu/components/NavItem'
import NavItemLink from 'components/mega-menu/components/NavItemLink'
import NavList from 'components/mega-menu/components/NavList'
import NavItemDescription from 'components/mega-menu/components/NavItemDescription'
import { Tab, Tabs } from 'react-bootstrap'

import Link from 'next/link';

// State Machines
import { MenuStateMachine } from 'components/mega-menu/state-machines/menus'

const Menu = ({ logoImage, active, data, hideMenu, type = 1 }) => {
  const [activeCatSubMenuIndex, setActiveCatSubMenuIndex] = useState(0);


  const [megaMenuState, setMegaMenuState] = useState('')
  const [subMenuState, setSubMenuState] = useState('')
  const [subSubMenuState, setSubSubMenuState] = useState('')
  const [activeMenus, setActiveMenus] = useState([]) // array that captures the ids of active menus
  const [isMobile, setIsMobile] = useState(true) // array that captures the ids of active menus
  const wrapperRef = useRef(null) // used to detect clicks outside of component

  const viewportLarge = 1024

  const resetMenus = () => {
    // close all menus and empty activeMenus array
    setActiveMenus([])
    setSubMenuState('closed')
    setSubSubMenuState('closed')
  }

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      // Reset menu if clicked on outside of element
      const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          resetMenus()
        }
      }

      // Bind the event listener to both mouse and key events
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleClickOutside)
      return () => {
        // Unbind the event listener to clean up
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('keydown', handleClickOutside)
      }
    }, [ref])
  }

  const updateActiveMenus = (state, menuId) => {
    if (state === 'open') {
      // add menuId from activeMenus
      setActiveMenus([...activeMenus, menuId])
    } else if (state === 'closed') {
      // remove menuId from activeMenus
      setActiveMenus(activeMenus.filter((item) => item !== menuId))
    }
  }

  const toggleMegaMenu = (e, menuId) => {
    e.preventDefault()

    const nextState = MenuStateMachine(megaMenuState)

    setMegaMenuState(nextState)

    updateActiveMenus(nextState, menuId)

    if (megaMenuState === 'open') {
      resetMenus()
    }
  }

  const toggleSubMenu = (e, menuId) => {
    e.preventDefault()

    const nextState = MenuStateMachine(subMenuState)

    setSubMenuState(MenuStateMachine(subMenuState))
    /*
      I haven't come up with single solution (yet) that takes care of
      opening and closing menus for both small and large screens, so for
      now I fork the logic based on viewport size.
      */
    if (!isMobile) {
      if (activeMenus.includes(menuId)) {
        // menu is already open, remove it from activeMenus to close it
        setActiveMenus([])
      } else {
        // menu is not yet active, add it to activeMenus to open it
        setActiveMenus([menuId])
      }
    } else {
      // remove menuId from activeMenus
      updateActiveMenus(nextState, menuId)
    }
  }

  const toggleSubSubMenu = (e, menuId) => {
    e.preventDefault()

    const nextState = MenuStateMachine(subSubMenuState)

    setSubSubMenuState(MenuStateMachine(subSubMenuState))

    updateActiveMenus(nextState, menuId)
  }

  useEffect(() => {
    if (window.innerWidth >= viewportLarge) {
      setIsMobile(false)
    } else {
      setIsMobile(true)
    }
  }, [activeMenus, isMobile])

  const doEscape = (e) => {
    if (e.keyCode === 27) {
      resetMenus()
    }
  }

  const a11yClick = (e) => {
    const code = e.charCode || e.keyCode
    if (code === 32 || code === 13) {
      return true
    }
  }


  useEffect(() => {
    document.addEventListener('keydown', doEscape, false)
    return () => {
      document.removeEventListener('keydown', doEscape, false)
    }
  })

  useOutsideAlerter(wrapperRef) // create bindings for closing menu from outside events
  const onmouseover = () => {

  }

  let link = "";
  switch (type) {
    case 1: //category
      link = "category";
      break;
    case 2: //category
      link = "brand";
      break;
  }

  return (
    <div className=" container rmm__root" ref={wrapperRef}>
      <nav
        id="site-nav"
        //  onMouseLeave={hideMenu}
        activeState={active == true ? 'open' : 'closed'}
        ariaLabel="Main Navigation">

        <MegaList
          id="menu-Mega-Menu"
          activeState={
            active == true ? 'open' : 'closed'
          }
        >

          {data && data.length > 0 ? data.map((item, index) => {
            return (

              // type == 1 ?


                <li onClick={(e) => e.stopPropagation()}
                  id={`nav-Mega-Menu-Sub-menu-item-${item.key}`} onMouseEnter={() => setActiveCatSubMenuIndex(index)} className='rmm__nav-item  nav-sub-item' role="none">
                  <Link
                    // href={`${link}${item.key}`} 
                    // as={`/${link}/${item.id}`}
                    href={type == 1 ? `/productcategory/${item.key}` : `/product/brand/${item.key}`}
                  >
                    <a
                      className='rmm__nav-item-link rmm__nav-item-link--heading'
                      id={`${item.key}`}
                      role="menuitem"
                      isHeading>
                      <span onmouseover={() => onmouseover(item.title)} className=''>  {item.title} </span>
                      <span className="flaticon-right-chevron-1 flip-h"></span>
                    </a>
                  </Link>
                  <div className='nav-sub-content'>
                    {
                      item.children && item.children.length > 0 ?
                        <NavList
                          id={`menu-Mega-Menu-Sub-menu-item-0`}
                          role="menu"
                          isSub
                          isSubSub
                          activeState={
                            activeMenus.includes(`menu-Mega-Menu-Sub-menu-item-0`)
                              ? 'open'
                              : 'closed'
                          }

                        >
                          {item.children.map(childItem => {
                            return (
                              <>

                                <NavItem className='nav-sub-sub-item' role="none" id={`${childItem.key}`} key={childItem.key}>
                                  <NavItemLink
                                    id={`${childItem.key}`}
                                    role="menuitem"
                                    // href={`${link}${childItem.key}`}
                                    href={type == 1 ? `/product/category/${childItem.key}` : `/brandcategory/${item.key}/${childItem.key}`}
                                  >
                                    <span> {childItem.title}</span>
                                  </NavItemLink>

                                </NavItem>

                                {
                                  childItem.children && childItem.children.map(childchildItem => {
                                    return <NavItem id={`${childchildItem.key}`} className='nav-sub-sub-sub-item'>
                                      <NavItemLink
                                        id={`${childchildItem.key}`}
                                        href={`/product/${childchildItem.key}`}
                                      >
                                        <span> {childchildItem.title}</span>
                                      </NavItemLink>
                                    </NavItem>
                                  })
                                }
                              </>
                            )
                          })}
                        </NavList>

                        : <div className='empty-sub-content'></div>
                    }
                  </div>


                </li>

                // :
                // type == 2 &&  item.title.includes("سایر") ?
                // <>


                //   <li onClick={(e) => e.stopPropagation()}
                //     id={`nav-Mega-Menu-Sub-menu-item-${item.key}`} onMouseEnter={() => setActiveCatSubMenuIndex(index)} className='rmm__nav-item  nav-sub-item' role="none">

                //     <Link
                //       // href={`${link}${item.key}`} 
                //       // as={`/${link}/${item.id}`}
                //       href={type == 1 ? `/productcategory/${item.key}` : `/product/brand/${item.key}`}
                //     >
                //       <a
                //         className='rmm__nav-item-link rmm__nav-item-link--heading'
                //         id={`${item.key}`}
                //         role="menuitem"
                //         isHeading>
                //         <span onmouseover={() => onmouseover(item.title)} className=''>  {item.title} </span>
                //         <span className="flaticon-right-chevron-1 flip-h"></span>
                //       </a>

                //     </Link>



                //     <div className='nav-sub-content'>
                //       {
                //         item.children && item.children.length > 0 ?
                //           <NavList
                //             id={`menu-Mega-Menu-Sub-menu-item-0`}
                //             role="menu"
                //             isSub
                //             isSubSub
                //             activeState={
                //               activeMenus.includes(`menu-Mega-Menu-Sub-menu-item-0`)
                //                 ? 'open'
                //                 : 'closed'
                //             }

                //           >
                //             {item.children.map(childItem => {
                //               return (
                //                 <>

                //                   <NavItem className='nav-sub-sub-item' role="none" id={`${childItem.key}`} key={childItem.key}>
                //                     <NavItemLink
                //                       id={`${childItem.key}`}
                //                       role="menuitem"
                //                       // href={`${link}${childItem.key}`}
                //                       href={type == 1 ? `/product/category/${childItem.key}` : `/brandcategory/${item.key}/${childItem.key}`}
                //                     >
                //                       <span> {childItem.title}</span>
                //                     </NavItemLink>

                //                   </NavItem>

                //                   {
                //                     childItem.children && childItem.children.map(childchildItem => {
                //                       return <NavItem id={`${childchildItem.key}`} className='nav-sub-sub-sub-item'>
                //                         <NavItemLink
                //                           id={`${childchildItem.key}`}
                //                           href={`/product/${childchildItem.key}`}
                //                         >
                //                           <span> {childchildItem.title}</span>
                //                         </NavItemLink>
                //                       </NavItem>
                //                     })
                //                   }
                //                 </>
                //               )
                //             })}
                //           </NavList>

                //           : <div className='empty-sub-content'></div>
                //       }
                //     </div>


                //   </li>

                // </> :

                // index < 9 ?
                //   <>


                //     <li onClick={(e) => e.stopPropagation()}
                //       id={`nav-Mega-Menu-Sub-menu-item-${item.key}`} onMouseEnter={() => setActiveCatSubMenuIndex(index)} className='rmm__nav-item  nav-sub-item' role="none">

                //       <Link
                //         // href={`${link}${item.key}`} 
                //         // as={`/${link}/${item.id}`}
                //         href={type == 1 ? `/productcategory/${item.key}` : `/product/brand/${item.key}`}
                //       >
                //         <a
                //           className='rmm__nav-item-link rmm__nav-item-link--heading'
                //           id={`${item.key}`}
                //           role="menuitem"
                //           isHeading>
                //           <span onmouseover={() => onmouseover(item.title)} className=''>  {item.title} </span>
                //           <span className="flaticon-right-chevron-1 flip-h"></span>
                //         </a>

                //       </Link>



                //       <div className='nav-sub-content'>
                //         {
                //           item.children && item.children.length > 0 ?
                //             <NavList
                //               id={`menu-Mega-Menu-Sub-menu-item-0`}
                //               role="menu"
                //               isSub
                //               isSubSub
                //               activeState={
                //                 activeMenus.includes(`menu-Mega-Menu-Sub-menu-item-0`)
                //                   ? 'open'
                //                   : 'closed'
                //               }

                //             >
                //               {item.children.map(childItem => {
                //                 return (
                //                   <>

                //                     <NavItem className='nav-sub-sub-item' role="none" id={`${childItem.key}`} key={childItem.key}>
                //                       <NavItemLink
                //                         id={`${childItem.key}`}
                //                         role="menuitem"
                //                         // href={`${link}${childItem.key}`}
                //                         href={type == 1 ? `/product/category/${childItem.key}` : `/brandcategory/${item.key}/${childItem.key}`}
                //                       >
                //                         <span> {childItem.title}</span>
                //                       </NavItemLink>

                //                     </NavItem>

                //                     {
                //                       childItem.children && childItem.children.map(childchildItem => {
                //                         return <NavItem id={`${childchildItem.key}`} className='nav-sub-sub-sub-item'>
                //                           <NavItemLink
                //                             id={`${childchildItem.key}`}
                //                             href={`/product/${childchildItem.key}`}
                //                           >
                //                             <span> {childchildItem.title}</span>
                //                           </NavItemLink>
                //                         </NavItem>
                //                       })
                //                     }
                //                   </>
                //                 )
                //               })}
                //             </NavList>

                //             : <div className='empty-sub-content'></div>
                //         }
                //       </div>


                //     </li>

                //   </>
                //   :
                //   null

            )
          }) : null}
          {/* {
            type == 2 ?
              <>
                <li onClick={(e) => e.stopPropagation()}
                  id={`nav-Mega-Menu-Sub-menu-item-${10 * 1000}`} className='rmm__nav-item  nav-sub-item' role="none">

                  <Link

                    href={`/brands`}
                  >
                    <a
                      className='rmm__nav-item-link rmm__nav-item-link--heading'
                      id={`${10 * 10000}`}
                      role="menuitem"
                      isHeading>
                      <span onmouseover={() => onmouseover(" سایر برندها ")} className=''>  سایر برندها </span>
                      <span className="flaticon-right-chevron-1 flip-h"></span>
                    </a>

                  </Link>

                  <div className='nav-sub-content'>
                  <div className='empty-sub-content'></div>
                  </div>
                </li>
              </>
              : null
          } */}

        </MegaList>
      </nav>
    </div>
  )
}

Menu.defaultProps = { logoImage: null, active: false }
Menu.propTypes = {
  logoImage: PropTypes.string,
  active: PropTypes.active ? PropTypes.active : false
}

export default Menu
