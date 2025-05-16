import React from 'react';

function Services() {
    return (
        <div style={{
            maxWidth: '900px',
            margin: '50px auto',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }}>

            <h1 style={{
                color: '#2c3e50',
                textAlign: 'center',
                marginBottom: '30px'
            }}>Our Services</h1>

            <p style={{
                fontSize: '18px',
                lineHeight: '1.8',
                color: '#333333',
                marginBottom: '20px'
            }}>
                At <strong>IS-Compu</strong>, we are dedicated to delivering an exceptional online shopping experience for all your laptop and computing needs. Our wide array of services is tailored to make your journey from browsing to purchasing as smooth, safe, and satisfying as possible.
            </p>

            <ul style={{
                fontSize: '17px',
                lineHeight: '1.7',
                color: '#555555',
                paddingLeft: '20px'
            }}>
                <li><strong>Extensive Product Range:</strong> Explore a carefully curated selection of laptops for students, gamers, professionals, and businesses, featuring top global brands like Dell, HP, Lenovo, ASUS, and more.</li>
                <li><strong>Fast & Secure Delivery:</strong> We provide quick nationwide delivery with real-time tracking, ensuring your order reaches you safely and on time.</li>
                <li><strong>Flexible Payment Options:</strong> Choose from multiple payment methods including credit/debit cards, bank transfers, cash on delivery, and interest-free installment plans.</li>
                <li><strong>Genuine Products with Warranty:</strong> Every laptop we sell is 100% original and comes with a manufacturer’s warranty for peace of mind.</li>
                <li><strong>Professional Customer Support:</strong> Our experienced support team is available 24/7 to answer your questions, assist with orders, and guide you through any technical issues.</li>
                <li><strong>Easy Return & Exchange Policy:</strong> Changed your mind? No problem. We offer a hassle-free return and exchange process within a defined period.</li>
                <li><strong>Exclusive Deals & Offers:</strong> Enjoy regular discounts, seasonal sales, and exclusive online offers on top-performing laptops and accessories.</li>
                <li><strong>Expert Buying Guides:</strong> Not sure what to buy? Our online guides and blog articles help you make informed decisions based on performance, usage, and budget.</li>
                <li><strong>After-Sales Services:</strong> We go beyond the sale by offering after-purchase support, maintenance tips, and repair assistance when needed.</li>
            </ul>

            <p style={{
                fontSize: '18px',
                lineHeight: '1.8',
                color: '#333333',
                marginTop: '20px'
            }}>
                At <strong>IS-Compu</strong>, we don't just sell laptops — we build trust. Your satisfaction is our priority, and we strive to ensure that every customer leaves with the right device and a smile.
            </p>
        </div>
    );
}

export default Services;