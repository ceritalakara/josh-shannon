/**
 * Canonical Event Configuration
 * Single source of truth for Shannon and Josh's Wedding
 * Used across /day and /evening invitations, interactive components, countdown timer, and metadata.
 */
(function (global) {
  // Reset legacy service workers and browser Cache Storage to bust stale caches
  if (typeof window !== "undefined") {
    try {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.getRegistrations().then(function (registrations) {
          registrations.forEach(function(r){ r.unregister(); });
        }).catch(function () {});
      }
      if ("caches" in window) {
        caches.keys().then(function (keys) {
          keys.forEach(function(k){ caches.delete(k); });
        }).catch(function () {});
      }
    } catch (e) {}
  }

  var EVENT_CONFIG = {
    couple: "Shannon and Josh",
    // Canonical event date string for hero and Date & Time sections
    dateText: "Tuesday, 24th August 2027",
    // Formatted date for invitation card inside the envelope
    cardDate: "24 . 08 . 2027",
    // Formatted date for opening cover / footer
    coverDate: "AUGUST 24, 2027",
    // Standard ISO 8601 date
    isoDate: "2027-08-24",
    // Ceremony start time
    ceremonyTime: "2:00 PM",
    ceremonyArrival: "1:30 PM",
    // Evening reception time
    eveningTime: "7:00 PM",
    eveningCarriages: "Midnight",
    // Venue timezone (Europe/London: BST / UTC+1 in August)
    timezone: "Europe/London",
    // ISO string with timezone offset for Europe/London (BST = UTC+01:00)
    targetIso: "2027-08-24T14:00:00+01:00",
    // Target timestamp in ms
    targetTimestamp: 1819112400000, // new Date("2027-08-24T14:00:00+01:00").getTime()
    venue: {
      name: "The Ravenswood",
      street: "Cinder Hill, Sharpthorne",
      region: "West Sussex",
      postalCode: "RH19 4HY",
      country: "GB"
    },
    accommodationCode: "RWSJ240827",
    accommodationLink: "https://app.thebookingfactory.com/the-ravenswood1/book/240827shannonjoshua#/"
  };

  global.EVENT_CONFIG = EVENT_CONFIG;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = EVENT_CONFIG;
  }
})(typeof window !== "undefined" ? window : globalThis);
