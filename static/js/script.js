document.addEventListener('DOMContentLoaded', (e) => {
    console.log('DOM fully loaded and parsed')
})
console.log('Script is loaded')


document.getElementsByTagName('tbody')[0].addEventListener('click', (e) => {
    e.preventDefault()
    console.dir(e.target)
    if(e.target.classList.contains('added')) {
        // Get the index they clicked on
        let i = e.target.id.slice(3)
        console.log('targetid: ',e.target.id, 'slicedid: ', i)
        let wine = document.getElementById('wine' + i).value;
        let appellation = document.getElementById('appellation' + i).value;
        let regions = document.getElementById('regions' + i).value;
        let country = document.getElementById('country' + i).value;
        let vintage = document.getElementById('vintage' + i).value;
        let score = document.getElementById('score' + i).value;
        let tasted = document.getElementById('tasted' + i).value;
        let wishlist = document.getElementById('wishlist' + i).value;

        
        console.log('Matched classes - now add ?')
        // This route we are calling (on the back end)
        // will add a row to the tasted table
        console.log(`wine: ${wine}, appellation: ${appellation}, regions: ${regions}, country: ${country}, vintage: ${vintage}, score: ${score}, tasted: ${tasted}, wishlist: ${wishlist}`)
        fetch('/profile/userlist', {
            method: 'POST',
            body: JSON.stringify({
                wine: wine,
                appellation: appellation,
                region: regions,
                country: country,
                vintage: vintage,
                score: score,
                tasted: tasted,
                wishlist: wishlist
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(resp => resp.json())
        .then(response => { 
            console.log('SUCCESS', response)
            
            // this is success, do DOM manipulation
            e.target.value = 'true'
            e.target.className = 'btn btn-success'
            e.target.innerHTML = '✓ Added'
        console.log('Added success', e.target)
        })
        .catch(err => {
            console.log('An error -', err)
        })
    } 
    else if(e.target.classList.contains('btn-success') || e.target.classList.contains('delete')) {
        console.log('Delete is occurring')
        let i = e.target.id.slice(3)
        console.log('target id: ', i)
        let wine = document.getElementById('wine' + i).value;
        console.log('vintage: ', document.getElementById('vintage' + i))
        let vintage = document.getElementById('vintage' + i).value;

        console.log('targetid: ',e.target.id, 'slicedid: ', i)
        fetch('/profile/userlist', {
            method: 'DELETE',
            body: JSON.stringify({
                wine: wine,
                vintage: vintage
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(resp => resp.json())
        .then(response => { 
            console.log('DELETE SUCCESS', response)
            
            // this is success, do DOM manipulation
            e.target.value = 'false'
            e.target.className = 'added btn btn-danger'
            e.target.innerHTML = 'Deleted - Re-Add to Your List'
        console.log('Delete success', e.target)
        })
        .catch(err => {
            console.log('An error -', err)
        })
    }
    // PUT to profile/userlist
    else if(e.target.classList.contains('tasted') || e.target.classList.contains('wishlist')) {
        console.log('Update is occurring')
        let i = e.target.id.slice(6)
        console.log('target id: ', i)
        let wine = document.getElementById('wine' + i).value;
        console.log('vintage: ', document.getElementById('vintage' + i))
        let vintage = document.getElementById('vintage' + i).value;
        let tasted = document.getElementById('tasted' + i).value;
        console.log('tasted: ', document.getElementById('tasted' + i))
        let wishlist = document.getElementById('wishlist' + i).value;
        console.log('wishlist: ', document.getElementById('wishlist' + i))

        console.log('targetid: ',e.target.id, 'slicedid: ', i)
        fetch('/profile/userlist', {
            method: 'PUT',
            body: JSON.stringify({
                wine: wine,
                vintage: vintage,
                tasted: tasted,
                wishlist: wishlist
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(resp => resp.json())
        .then(response => { 
            console.log('UPDATE SUCCESS', response)
            let tastedBtn = (document.getElementById('tastedBtn') + i)
            let wishlistBtn = (document.getElementById('wishlistBtn') + i)

            // this is success, do DOM manipulation
            if(tastedBtn.value) {
                tastedBtn.className = 'tasted btn btn-success'
                tastedBtn.innerHTML = '🍷 Tasted'
                wishlistBtn.className = 'wishlist btn'
                wishlistBtn.innerHTML = 'Change to Wishlist'
            }
            else {
                wishlistBtn.className = 'wishlist btn btn-primary'
                wishlistBtn.innerHTML = '🤞I wish!'
                tastedBtn.className = 'tasted btn'
                tastedBtn.innerHTML = 'Change to Tasted'
            }
        console.log('Update success', e.target)
        })
        .catch(err => {
            console.log('An error -', err)
        })
    }
    else { return }
})
