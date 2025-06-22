package reservation

class ReservationFragment {
    @AndroidEntryPoint
class ReservationFragment : Fragment(), OnMapReadyCallback {

    private lateinit var mapView: MapView
    private lateinit var googleMap: GoogleMap
    private lateinit var fusedLocationClient: FusedLocationProviderClient

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?
    ): View {
        val view = inflater.inflate(R.layout.fragment_reservation, container, false)
        mapView = view.findViewById(R.id.mapView)
        mapView.onCreate(savedInstanceState)
        mapView.getMapAsync(this)
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(requireActivity())
        return view
    }

    override fun onMapReady(map: GoogleMap) {
        googleMap = map
        enableMyLocation()
    }

    private fun enableMyLocation() {
        if (ActivityCompat.checkSelfPermission(requireContext(), Manifest.permission.ACCESS_FINE_LOCATION)
            != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(
                requireActivity(),
                arrayOf(Manifest.permission.ACCESS_FINE_LOCATION),
                1
            )
            return
        }
        googleMap.isMyLocationEnabled = true
        fusedLocationClient.lastLocation.addOnSuccessListener { location ->
            location?.let {
                val myLatLng = LatLng(it.latitude, it.longitude)
                googleMap.moveCamera(CameraUpdateFactory.newLatLngZoom(myLatLng, 15f))
            }
        }
    }

    override fun onResume() {
        super.onResume()
        mapView.onResume()
    }

    override fun onPause() {
        super.onPause()
        mapView.onPause()
    }

    override fun onDestroy() {
        super.onDestroy()
        mapView.onDestroy()
    }
}

}
private fun triggerWorkflow(taxiId: String, userId: String) {
    val url = "http://10.0.2.2:5000/api/workflows/start"
    val params = JSONObject().apply {
        put("taxi_id", taxiId)
        put("user_id", userId)
    }

    val request = JsonObjectRequest(Request.Method.POST, url, params,
        { response ->
            Toast.makeText(context, "Workflow démarré avec succès !", Toast.LENGTH_SHORT).show()
        },
        { error ->
            Toast.makeText(context, "Erreur Temporal : ${error.message}", Toast.LENGTH_SHORT).show()
        }
    )
    Volley.newRequestQueue(requireContext()).add(request)
}

private fun bookTaxi(taxiId: String) {
    val url = "http://10.0.2.2:5000/api/reservations"
    val userId = SessionManager.getUserId(requireContext())
    val jsonBody = JSONObject().apply {
        put("taxi_id", taxiId)
        put("user_id", userId)
        put("date", LocalDateTime.now().toString())
    }

    val request = JsonObjectRequest(Request.Method.POST, url, jsonBody,
        { response ->
            Toast.makeText(context, "Réservation effectuée !", Toast.LENGTH_SHORT).show()
        },
        { error ->
            Toast.makeText(context, "Erreur de réservation : ${error.message}", Toast.LENGTH_SHORT).show()
        }
    )
    Volley.newRequestQueue(requireContext()).add(request)
}
