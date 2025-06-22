package profil

class ProfileActivity {
    package com.example.taxiapp.ui.profile

    import android.content.Intent
    import android.os.Bundle
    import androidx.appcompat.app.AppCompatActivity
    import com.example.taxiapp.databinding.ActivityProfileBinding
    import com.example.taxiapp.ui.auth.LoginActivity
    import com.google.firebase.auth.FirebaseAuth

    class ProfileActivity : AppCompatActivity() {
        private lateinit var binding: ActivityProfileBinding
        private lateinit var auth: FirebaseAuth

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            binding = ActivityProfileBinding.inflate(layoutInflater)
            setContentView(binding.root)

            auth = FirebaseAuth.getInstance()
            val user = auth.currentUser

            binding.textViewEmail.text = user?.email
            binding.textViewUserId.text = user?.uid

            binding.buttonLogout.setOnClickListener {
                auth.signOut()
                val intent = Intent(this, LoginActivity::class.java)
                startActivity(intent)
                finish()
            }
        }
    }

}