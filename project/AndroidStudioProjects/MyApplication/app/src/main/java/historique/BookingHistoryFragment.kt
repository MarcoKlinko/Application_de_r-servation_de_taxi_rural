package historique

class BookingHistoryFragment {
    class BookingHistoryFragment : Fragment() {

        private lateinit var recyclerView: RecyclerView
        private lateinit var bookingAdapter: BookingHistoryAdapter
        private val bookings = mutableListOf<Booking>()

        override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
            val view = inflater.inflate(R.layout.fragment_booking_history, container, false)
            recyclerView = view.findViewById(R.id.recyclerViewHistory)
            bookingAdapter = BookingHistoryAdapter(bookings)
            recyclerView.layoutManager = LinearLayoutManager(requireContext())
            recyclerView.adapter = bookingAdapter

            loadBookingHistory()

            return view
        }

        private fun loadBookingHistory() {
            val userId = SessionManager.getUserId(requireContext())
            val url = "http://10.0.2.2:5000/api/reservations/user/$userId"

            val request = JsonArrayRequest(Request.Method.GET, url, null,
                { response ->
                    bookings.clear()
                    for (i in 0 until response.length()) {
                        val obj = response.getJSONObject(i)
                        bookings.add(
                            Booking(
                                obj.getString("taxi_id"),
                                obj.getString("date"),
                                obj.getString("status")
                            )
                        )
                    }
                    bookingAdapter.notifyDataSetChanged()
                },
                { error ->
                    Toast.makeText(requireContext(), "Erreur : ${error.message}", Toast.LENGTH_LONG).show()
                }
            )
            Volley.newRequestQueue(requireContext()).add(request)
        }
    }

}