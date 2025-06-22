package reservation

class AvailableTaxisActivity {
    package com.example.taxiapp.ui.taxi

    import android.os.Bundle
    import android.widget.Toast
    import androidx.appcompat.app.AppCompatActivity
    import androidx.recyclerview.widget.LinearLayoutManager
    import com.example.taxiapp.databinding.ActivityAvailableTaxisBinding
    import com.example.taxiapp.models.Taxi
    import com.google.firebase.database.*

    class AvailableTaxisActivity : AppCompatActivity() {
        private lateinit var binding: ActivityAvailableTaxisBinding
        private lateinit var database: DatabaseReference
        private val taxis = mutableListOf<Taxi>()
        private lateinit var adapter: TaxiAdapter

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            binding = ActivityAvailableTaxisBinding.inflate(layoutInflater)
            setContentView(binding.root)

            adapter = TaxiAdapter(taxis)
            binding.recyclerViewTaxis.layoutManager = LinearLayoutManager(this)
            binding.recyclerViewTaxis.adapter = adapter

            database = FirebaseDatabase.getInstance().getReference("taxis")
            fetchAvailableTaxis()
        }

        private fun fetchAvailableTaxis() {
            database.addValueEventListener(object : ValueEventListener {
                override fun onDataChange(snapshot: DataSnapshot) {
                    taxis.clear()
                    for (taxiSnapshot in snapshot.children) {
                        val taxi = taxiSnapshot.getValue(Taxi::class.java)
                        if (taxi?.available == true) {
                            taxis.add(taxi)
                        }
                    }
                    adapter.notifyDataSetChanged()
                }

                override fun onCancelled(error: DatabaseError) {
                    Toast.makeText(this@AvailableTaxisActivity, "Erreur de chargement", Toast.LENGTH_SHORT).show()
                }
            })
        }
    }

}