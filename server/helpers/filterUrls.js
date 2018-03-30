import config from '../config'

export default function filterUrls(pathname, req){
	return config.internalUrls.every(url => url !== pathname) && !/\.|_/.test(pathname)
}
