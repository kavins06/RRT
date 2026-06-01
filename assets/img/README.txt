IMAGES - drop-in folder
=======================

All images are OPTIONAL. The site renders fully without them (gradient hero,
gold-ringed monogram headshots). Drop in matching filenames to upgrade:

  hero-poster.jpg   Hero still behind the headline (1920x1080). Shown before the
                    background video plays and on mobile (where video is skipped).

  morris.jpg        Jonathan Morris headshot. Portrait crop, 4:5 ratio
                    (e.g. 800x1000). Replaces the "JM" monogram automatically
                    once you also point the card at it (see note below).

  wilson.jpg        Bobby Wilson headshot. Same 4:5 portrait crop.

  og-image.jpg      Social-share preview (1200x630). Used by the Open Graph tags
                    for link previews on LinkedIn, iMessage, etc.

To show a founder photo, open index.html, find the founder's .leader__photo block,
and add an <img> above the monogram, e.g.:

  <div class="leader__photo">
    <img src="assets/img/morris.jpg" alt="Jonathan Morris" />
    <div class="leader__monogram"><span>JM</span></div>
  </div>

The <img> sits on top of the monogram, so it simply covers it when present.
